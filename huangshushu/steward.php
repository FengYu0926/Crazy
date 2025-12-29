<?php
include 'auth/session_check.php';
?>

<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        <meta name="description" content="SLTC - 提供智能生活與長照技術的最新解決方案" />
        <meta name="author" content="NKUST SLTC" />
        <title>SLTC</title>
        <!-- 網站圖示 -->
        <link rel="icon" type="image/png" href="assets/insurance.png" />
        <!-- 引入 Bootstrap CSS -->
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/css/bootstrap.min.css" rel="stylesheet">
        <!-- 引入 Simple-DataTables CSS -->
        <link href="https://cdn.jsdelivr.net/npm/simple-datatables@latest/dist/style.css" rel="stylesheet">
        <!-- 引入 Bootstrap JS -->
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/js/bootstrap.bundle.min.js"></script>
        <!-- 引入 Simple-DataTables JS -->
        <script src="https://cdn.jsdelivr.net/npm/simple-datatables@latest"></script>
        <!-- Font Awesome 圖示（免費版）-->
        <script src="https://use.fontawesome.com/releases/v6.3.0/js/all.js" crossorigin="anonymous"></script>
        <!-- Google 字體 -->
        <link href="https://fonts.googleapis.com/css?family=Montserrat:400,700" rel="stylesheet" type="text/css" />
        <link href="https://fonts.googleapis.com/css?family=Lato:400,700,400italic,700italic" rel="stylesheet" type="text/css" />
        <!-- 核心主題 CSS / JS -->
        <link href="css/styles2.css" rel="stylesheet" />
        <script src="js/scripts.js"></script>
    </head>

    <!-- 導覽列 -->
    <body>
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <div class="container-fluid">
                <a class="navbar-brand" href="">
                    <img src="assets/heart.png" alt="heart" class="d-inline-block align-text-top">
                    Heart
                </a>
                <!-- 手機版 -->
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" >
                <!-- navbar-toggler:定義按鈕的樣式類別 / collapse:摺疊功能 /   -->
                    <img src="assets/foldkey.png"></img>
                    <!-- <span class="navbar-toggler-icon "></span> -->
                </button>
                <!-- 導航選單 -->
                <div class="collapse navbar-collapse" id="navbarNav">
                    <ul class="navbar-nav ms-auto"> <!-- 右側按鈕 -->
                        <li class="nav-item">
                            <span class="nav-link">身分:管理員</span>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="auth/logout.php">登出</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    </body>

    <!-- 主容器 -->
    <body>
        <div class="container">
            <!-- 主橫幅 -->
            <div class="main-banner">
                <div class="text">
                    <h1>Cam1</h1>
                </div>
                <div class="rtsp-container">
                    <img class="rtsp-feed"
                        src="http://120.119.154.185:5000//video_feed_1"
                        onerror="this.onerror=null; 
                                this.classList.remove('rtsp-feed'); 
                                this.classList.add('no-signal'); 
                                this.src='assets/images/nopicture.png';"
                        alt="Camera Feed">
                </div>
            </div>

            <!-- 成員資料表 -->
            <div class="main-table">
                <h1>成員資料表</h1>
                <!-- datachoose.php處理勾選資料  -->
                <form id="userForm" action="" method="post"> 
                    <!-- <table id="datatablesSimple" class="datatable table table-hover"> -->
                    <table class="datatable table table-hover">
                        <thead>
                            <tr>
                                <th>序號(ID)</th>
                                <th>名單(中/En)</th>
                                <!-- <th>名單(中)</th> -->
                            </tr>
                        </thead>
                        <tbody>
                            <?php
                            include 'auth/database.php'; // 引入資料庫檔案
                            $users = get_member(); // 獲取用戶資料
                            if (!empty($users)) {
                                foreach ($users as $user) {
                                    echo "<tr>";
                                    echo "<td>" . htmlspecialchars($user['id']) . "</td>";
                                    echo "<td>" . htmlspecialchars($user['cname']) . 
                                            " (" . htmlspecialchars($user['ename']) . ") </td>";
                                    // echo "<td>" . htmlspecialchars($user['ename']) . "</td>";
                                    echo "</tr>";
                                }
                            } else {
                                echo "<tr><td colspan='3' class='text-center'>無資料</td></tr>";
                            }
                            ?>
                        </tbody>
                    </table>
                </form>
            </div>
            
            <!-- 新增異常資料表 -->
            <div class="main-table">
                <h1>異常資料表</h1>
                <table class="datatable table table-hover">
                    <thead>
                        <tr>
                            <th>異常名單</th>
                            <th>持續時間</th>
                            <th>結束時間</th>
                        </tr>
                    </thead>
                    <tbody>
                        <?php
                        // 使用不同的函數來獲取異常資料
                        $abnormalRecords = get_record();
                        if (!empty($abnormalRecords)) {
                            foreach ($abnormalRecords as $record) {
                                echo "<tr>";
                                echo "<td>" . htmlspecialchars($record['r_name']) . "</td>";
                                echo "<td>" . htmlspecialchars($record['r_duration']) . "</td>";
                                echo "<td>" . htmlspecialchars($record['r_timestamp']) . "</td>";
                                echo "</tr>";
                            }
                        } else {
                            echo "<tr><td colspan='3' class='text-center'>無異常資料</td></tr>";
                        }
                        ?>
                    </tbody>
                </table>
            </div>            

        </div>
    </body>

</html>
