#!/bin/bash

. /home/ukfit/.bashrc

PROJECT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
BACKUP_FOLDER="/home/ukfit/db_backups/ukfitdb2/monthly"
BACKUP_FILEPATH_CSV="$BACKUP_FOLDER/ukfitdb2-$(date -I).csv"
BACKUP_FILEPATH_XCL="$BACKUP_FOLDER/ukfitdb2-$(date -I).xlsx"

CURRENT_FILEPATH="$BACKUP_FOLDER/current.backup"
mkdir -p $BACKUP_FOLDER

# Download the current CSV of publications
CSV_URL="https://docs.google.com/spreadsheets/d/e/2PACX-1vQ6MirpSf_ARZD9wrv3PzSiAjWU7JwbmK64j91p_kUi4uter83dLSdzsrX8NwO4Tu28-aMs6s05dfd6/pub?gid=845632468&single=true&output=csv"
wget -O "${BACKUP_FILEPATH_CSV}" ${CSV_URL}
# Download the current XSLX of publications
XCL_URL="https://docs.google.com/spreadsheets/d/e/2PACX-1vQ6MirpSf_ARZD9wrv3PzSiAjWU7JwbmK64j91p_kUi4uter83dLSdzsrX8NwO4Tu28-aMs6s05dfd6/pub?output=xlsx"
wget -O "${BACKUP_FILEPATH_XCL}" ${XCL_URL}

# send an email with the DB to the admin
python3 "/home/ukfit/tools/email/sendmail.py" "/home/ukfit/db_backups/ukfitdb2/email-config.json" "${BACKUP_FILEPATH_CSV}" "${BACKUP_FILEPATH_XCL}"

# upload db backup and images to google drive https://github.com/labbots/google-drive-upload
cd /home/ukfit/drive-upload
bash upload.sh "$BACKUP_FILEPATH_CSV" "UKFITDB2" >/dev/null 2>&1
bash upload.sh "$BACKUP_FILEPATH_XCL" "UKFITDB2" >/dev/null 2>&1

# write to the log
echo "Monthly backup ran: $(date -I)" >> "$BACKUP_FOLDER/backup.log"
