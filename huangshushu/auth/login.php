<!-- 處理帳號密碼，並設定 SESSION -->
<?php
session_start(); // 啟動 Session 來記錄登入狀態

$servername = "localhost";
$username = "Frank";
$password = "a90092600";
$dbname = "main";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("連接資料庫失敗: " . $conn->connect_error);
}

$username = $conn->real_escape_string($_POST['username']);
$password = $conn->real_escape_string($_POST['password']);

// 直接從資料庫中比對明文密碼
$sql = "SELECT pass, cname FROM `manager` WHERE ename='$username'";
$result = $conn->query($sql);

// 檢查是否找到帳號
if ($result -> num_rows == 1) {
    $row = $result -> fetch_assoc();
    $storedPassword = $row['pass'];
    $part = $row['cname']; //獲取身份

    // 使用 password_verify 比對用戶輸入的明文密碼和資料庫中的雜湊密碼
    // if (password_verify($password, $storedHashedPassword)) {

    // 直接比對用戶輸入的密碼與資料庫中的明文密碼
    if ($password === $storedPassword) {
        
        // 設定 SESSION
        $_SESSION['user_role'] = $part; 

        // 據身份導向不同的頁面
        if ($part == '峯瑜') {
            header('Location: ../steward.php');
        } elseif ($part == '紹樺') {
            header('Location: ../user1.php');
        // } else {
        //     header('Location: https://www.nkust.edu.tw/');
        }
        exit(); // 確保重定向後停止執行其餘代碼

    } else {
        echo "登入失敗：密碼錯誤";
        echo '<button onclick="window.location.href=\'../index.php\'">前往登入</button>';
    }
} else {
    echo "登入失敗：帳號不存在";
    echo '<button onclick="window.location.href=\'../index.php\'">前往登入</button>';
    // echo '<button onclick="window.location.href= \'https://www.nkust.edu.tw/\' ">前往NKUST</button>';
}

$conn->close();
?>
