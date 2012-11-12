magicdiscuz
===========

magic project of discuz

配置要点
#配置文件
以下几个配置文件需要单独配置,并且涉及到一些密钥信息,具体配置请联系开发人员
config/config_global.php
config/config_ucenter.php
uc_server/data/config.inc.php

配置 theme 要点


imgdir 如果出错那么可以检查数据库中
表 pre_common_stylevar -> imgdir

在开发过程中,需要每次更新 css 和 template ,
编辑 config/config_global.php 再末尾添加 $_config['debug_ui']=1
另外如果想要 dump 出运行期间的一些数据,可以添加 $_config['debug']=1
