<?php
class Database {
    private $db;

    public function __construct() {
        $this->db = new SQLite3('/var/www/html/utils/database.db');
    }

    public function query($query, $params = array()) {
        $stmt = $this->db->prepare($query);
        if ($stmt === false) {
            return false;
        }

        foreach ($params as $paramKey => $paramValue) {
            $stmt->bindValue($paramKey, $paramValue);
        }

        $result = $stmt->execute();
        if ($result === false) {
            return false;
        }

        $rows = array();
        while ($row = $result->fetchArray(SQLITE3_ASSOC)) {
            $rows[] = $row;
        }

        return $rows;
    }
}
?>
