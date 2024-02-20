sudo apt-get remove nodejs -y
curl -sL https://deb.nodesource.com/setup_14.x | sudo -E bash -
sudo apt-get install -y nodejs
cd angular/
npm install
cd ../nodejs/
npm install
bash dbinstall.sh
echo "all installations done"
