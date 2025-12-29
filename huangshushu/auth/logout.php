<!-- 登出時銷毀 SESSION，返回登入頁面 -->
<?php
session_start();
session_unset(); // 清除所有 Session 變數
session_destroy(); // 摧毀 Session

header("Location: ../index.php");
exit();
?>
