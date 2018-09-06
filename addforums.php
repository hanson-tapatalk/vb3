<?php
/*======================================================================*\
|| #################################################################### ||
|| # vBulletin 3.8.11 - Licence Number VBF83FEF44
|| # ---------------------------------------------------------------- # ||
|| # Copyright �2000-2018 vBulletin Solutions Inc. All Rights Reserved. ||
|| # This file may not be redistributed in whole or significant part. # ||
|| # ---------------- VBULLETIN IS NOT FREE SOFTWARE ---------------- # ||
|| #        www.vbulletin.com | www.vbulletin.com/license.html        # ||
|| #################################################################### ||
\*======================================================================*/

// ####################### SET PHP ENVIRONMENT ###########################
error_reporting(E_ALL & ~E_NOTICE);

// #################### DEFINE IMPORTANT CONSTANTS #######################
define('THIS_SCRIPT', 'index');
define('CSRF_PROTECTION', true);
define('CSRF_SKIP_LIST', '');

// ######################### REQUIRE BACK-END ############################
require_once('./global.php');
require_once(DIR . '/includes/functions_bigthree.php');
require_once(DIR . '/includes/functions_forumlist.php');

//foreach ($vbulletin->forumcache AS $forumid => $forum)
//{
//    $sql = "update vb3_forum set title='" . $forum['title'] . "', title_clean='" . $forum['title_clean'] . "' where forumid=" . $forum['forumid'];
//    $db->query($sql);
//}
//exit;


$forum_param['title']                        = 'sub';
$forum_param['description']                  = '';
$forum_param['link']                         = '';
$forum_param['displayorder']                 = '1';
$forum_param['parentid']                     = '11';
$forum_param['daysprune']                    = '-1';
$forum_param['defaultsortfield']             = 'lastpost';
$forum_param['defaultsortorder']             = 'desc';
$forum_param['showprivate']                  = '0';
$forum_param['newpostemail']                 = '';
$forum_param['newthreademail']               = '';
$forum_param['options']['moderatenewpost']   = '0';
$forum_param['options']['moderatenewthread'] = '0';
$forum_param['options']['moderateattach']    = '0';
$forum_param['styleid']                      = '-1';
$forum_param['options']['styleoverride']     = '0';
$forum_param['imageprefix']                  = '';
$forum_param['password']                     = '';
$forum_param['options']['canhavepassword']   = '1';
$forum_param['options']['cancontainthreads'] = '1';
$forum_param['options']['active']            = '1';
$forum_param['options']['allowposting']      = '1';
$forum_param['options']['indexposts']        = '1';
$forum_param['options']['allowhtml']         = '0';
$forum_param['options']['allowbbcode']       = '1';
$forum_param['options']['allowimages']       = '1';
$forum_param['options']['allowsmilies']      = '1';
$forum_param['options']['allowicons']        = '1';
$forum_param['options']['allowratings']      = '1';
$forum_param['options']['countposts']        = '1';
$forum_param['options']['showonforumjump']   = '1';
$forum_param['options']['prefixrequired']    = '0';

function addF($vbulletin, $forum_param)
{
    foreach (range(15, 16) as $p)
    {
        foreach (range(1, 1000) as $i)
        {
            $forum_param['parentid'] = $p;
            $forum_param['title']    = 'sub' . $p . '-' . $i;

            $vbulletin->input->clean_array_gpc('p', [
                'forumid'         => TYPE_UINT,
                'applypwdtochild' => TYPE_BOOL,
                'forum'           => TYPE_ARRAY,
                'prefixset'       => TYPE_ARRAY_NOHTML,
            ]);

            $forumdata = datamanager_init('Forum', $vbulletin, ERRTYPE_CP);

            foreach ($forum_param AS $varname => $value)
            {
                if ($varname == 'options')
                {
                    foreach ($value AS $key => $val)
                    {
                        $forumdata->set_bitfield('options', $key, $val);
                    }
                }
                else
                {
                    $forumdata->set($varname, $value);
                }
            }

            $forumid = $forumdata->save();

            yield $forumid;

        }
    }
}

foreach (addF($vbulletin, $forum_param) as $forumid)
{
    if ($forumid % 100 === 0)
    {
        echo $forumid . PHP_EOL;
    }
}

exit;