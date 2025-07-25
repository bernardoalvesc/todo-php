<?php
class Database {
    private static $pdo;

    public static function getConnection(): PDO {
        if (!self::$pdo) {
            self::$pdo = new PDO('sqlite:' . __DIR__ . '/../database.sqlite');
            self::$pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        }
        return self::$pdo;
    }
}
