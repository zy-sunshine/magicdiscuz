find -type  d | xargs chmod 775
find -type  f | xargs chmod 664
chmod a+w ./config/ -R
chmod a+w ./data/ -R
chmod a+w ./uc_client/ -R
chmod a+w ./uc_server/ -R
