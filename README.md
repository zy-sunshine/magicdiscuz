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
--- a/source/function/function_core.php
+++ b/source/function/function_core.php
@@ -468,8 +468,11 @@ function checktplrefresh($maintpl, $subtpl, $timecompare, $templateid, $cachefil
                $timestamp = getglobal('timestamp');
        }

-       if(empty($timecompare) || $tplrefresh == 1 || ($tplrefresh > 1 && !($timestamp % $tplrefresh))) {
-               if(empty($timecompare) || @filemtime(DISCUZ_ROOT.$subtpl) > $timecompare) {
+       require_once DISCUZ_ROOT.'/source/function/function_cache.php';^M
+       updatecache(array("styles", "smilies_js"));^M
+       #if(empty($timecompare) || $tplrefresh == 1 || ($tplrefresh > 1 && !($timestamp % $tplrefresh))) {^M
+       #       if(empty($timecompare) || @filemtime(DISCUZ_ROOT.$subtpl) > $timecompare) {^M
                        require_once DISCUZ_ROOT.'/source/class/class_template.php';
                        $template = new template();
                        $template->parse_template($maintpl, $templateid, $tpldir, $file, $cachefile);
@@ -483,8 +486,8 @@ function checktplrefresh($maintpl, $subtpl, $timecompare, $templateid, $cachefil
                                $targettplname = true;
                        }
                        return TRUE;
-               }
-       }
+       #       }^M
+       #}^M
        return FALSE;
 }

