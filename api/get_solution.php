<?php
header('Content-Type: application/json');

// Config MySQL
$host = 'localhost';
$db   = 'maintenance_ai';
$user = 'root';
$pass = '';
$charset = 'utf8mb4';

$dsn = "mysql:host=$host;dbname=$db;charset=$charset";
$options = [
    PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
];

try {
    $pdo = new PDO($dsn, $user, $pass, $options);
} catch (PDOException $e) {
    echo json_encode(['error' => $e->getMessage()]);
    exit;
}

// Récupération des paramètres
$machine = $_GET['machine'] ?? '';
$problem = $_GET['problem'] ?? '';

if (!$machine || !$problem) {
    echo json_encode([]);
    exit;
}

// Récupérer toutes les pannes de la machine
$stmt = $pdo->prepare("SELECT * FROM pannes WHERE machine = ?");
$stmt->execute([$machine]);
$pannes = $stmt->fetchAll();

// Filtrer par mots-clés
$problemLower = strtolower($problem);
$matched = [];

foreach ($pannes as $p) {
    $keywords = explode(',', $p['keywords']);
    $score = 0;
    foreach ($keywords as $kw) {
        if (strpos($problemLower, strtolower(trim($kw))) !== false) {
            $score++;
        }
    }
    if ($score > 0) {
        $solutions = explode('|', $p['solutions']);
        $matched[] = [
            'category' => $p['category'],
            'solutions' => $solutions,
            'score' => $score
        ];
    }
}

// Trier par score
usort($matched, function($a, $b){ return $b['score'] - $a['score']; });

echo json_encode($matched);
?>
