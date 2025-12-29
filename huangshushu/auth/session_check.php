<!-- 保護內部網頁 -->
<?php
session_start();

if (!isset($_SESSION['user_role'])) {
    header("Location: index.php");
    exit();
}

?>

