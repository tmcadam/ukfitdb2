#!/bin/bash

. /home/ukfit/.bashrc


PROJECT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

BACKUP_FOLDER="/home/ukfit/db_backups/ukfitdb2/daily"
BACKUP_FILEPATH="$BACKUP_FOLDER/ukfitdb2-$(date -I).csv"

mkdir -p $BACKUP_FOLDER

CSV_URL="https://docs.google.com/spreadsheets/d/e/2PACX-1vQ6MirpSf_ARZD9wrv3PzSiAjWU7JwbmK64j91p_kUi4uter83dLSdzsrX8NwO4Tu28-aMs6s05dfd6/pub?gid=845632468&single=true&output=csv"

wget -O "${BACKUP_FILEPATH}" ${CSV_URL}

echo "Daily backup ran: $(date -I)" >> "$BACKUP_FOLDER/backup.log"

#Delete daily backups older than 31 days
find "$BACKUP_FOLDER" -iname *.csv -type f -mtime +31 -exec rm -f {} \;
