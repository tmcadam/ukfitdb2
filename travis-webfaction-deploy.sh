#!/bin/bash

echo "Deploying to Webfaction"

PROJECT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
export SSHPASS=$DEPLOY_PASS

cd "${PROJECT_DIR}/dist/"
zip -r "${PROJECT_DIR}/dist-${1}.zip" ./ >/dev/null 2>&1
cd "${PROJECT_DIR}"

if [ ${1} = "staging" ];
then
    echo "Deploying to staging server"
    DEPLOY_PATH=$DEPLOY_PATH_STAGING
else
    echo "Deploying to production server"
    # Install the backup scripts if in prod
    # sshpass -p $DEPLOY_PASS scp -o stricthostkeychecking=no "${PROJECT_DIR}/daily-backup.sh" ${DEPLOY_USER}@${DEPLOY_HOST}:${DEPLOY_HOME}/db_backups/ukfitdb2
    # sshpass -p $DEPLOY_PASS scp -o stricthostkeychecking=no "${PROJECT_DIR}/monthly-backup.sh" ${DEPLOY_USER}@${DEPLOY_HOST}:${DEPLOY_HOME}/db_backups/ukfitdb2
    # sshpass -p $DEPLOY_PASS scp -o stricthostkeychecking=no "${PROJECT_DIR}/install_cronjobs.sh" ${DEPLOY_USER}@${DEPLOY_HOST}:${DEPLOY_HOME}/db_backups/ukfitdb2
    # sshpass -e ssh -o stricthostkeychecking=no $DEPLOY_USER@$DEPLOY_HOST bash "${DEPLOY_HOME}/db_backups/ukfitdb2/install_cronjobs.sh"
fi
echo $DEPLOY_PATH
if [ ! -n "$DEPLOY_PATH" ]; then
  echo Varible not set, exiting
  exit 1
fi

cat > ${PROJECT_DIR}/deploy.sh << EOF
#!/bin/bash
set -e
cd ${DEPLOY_PATH}
rm -rf *
unzip -q ${DEPLOY_HOME}/dist-${1}.zip -d ${DEPLOY_PATH}/
rm ${DEPLOY_HOME}/dist-${1}.zip
rm ${DEPLOY_HOME}/deploy.sh
EOF

sshpass -e scp -o stricthostkeychecking=no -P ${DEPLOY_PORT} "${PROJECT_DIR}/dist-${1}.zip" "${PROJECT_DIR}/deploy.sh" ${DEPLOY_USER}@${DEPLOY_HOST}:${DEPLOY_HOME}
echo 1
sshpass -e ssh -o stricthostkeychecking=no -p $DEPLOY_PORT $DEPLOY_USER@$DEPLOY_HOST sudo bash ${DEPLOY_HOME}/deploy.sh
echo 2
