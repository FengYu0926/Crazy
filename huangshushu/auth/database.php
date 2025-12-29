<?php
// 資料庫連接設置
$host = 'localhost';
$dbname = 'main';
$username = 'Frank';
$password = 'a90092600';

try {
    // 建立 PDO 連接
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    die("資料庫連接失敗：" . $e->getMessage());
}

// 獲取成員資料的函數
function get_member() {
    global $pdo;
    $stmt = $pdo->prepare("SELECT id, ename, cname FROM `member`");
    $stmt->execute();
    return $stmt->fetchAll(PDO::FETCH_ASSOC);
}

// 獲取異常資料的函數
function get_record() {
    global $pdo;
    $stmt = $pdo->prepare("SELECT r_name, r_duration, r_timestamp FROM `record`");
    $stmt->execute();
    return $stmt->fetchAll(PDO::FETCH_ASSOC);
}

// 
function get_member_carer($carer) {
    global $pdo;
    $stmt = $pdo->prepare("SELECT id, ename, cname FROM `member` WHERE carer = :carer");
    $stmt->bindParam(':carer', $carer, PDO::PARAM_STR);
    $stmt->execute();
    return $stmt->fetchAll(PDO::FETCH_ASSOC);
}

function get_carer_record($carer) {
    global $pdo;
    // 先找 負責人(carer = 'xxx') 負責的人員(ename)
    $stmt = $pdo->prepare("SELECT ename FROM `member` WHERE carer = :carer");
    $stmt->bindParam(':carer', $carer, PDO::PARAM_STR);
    $stmt->execute();
    $enames = $stmt->fetchAll(PDO::FETCH_COLUMN); // 取得 ename 陣列
    // 在 record 表中查詢這些 ename 的異常記錄
    $r_names = implode(',', array_fill(0, count($enames), '?')); // 生成 SQL 佔位符
    $stmt = $pdo->prepare("SELECT r_name, r_duration, r_timestamp FROM `record` WHERE r_name IN ($r_names)");
    // 執行 SQL，將 ename 陣列值綁定到查詢
    $stmt->execute($enames);
    return $stmt->fetchAll(PDO::FETCH_ASSOC);
}

?>

