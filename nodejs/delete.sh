sudo service mongodb start
mongo --eval 'db.users.remove({})' PatientManagement
