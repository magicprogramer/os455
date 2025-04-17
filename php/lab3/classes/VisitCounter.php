<?php
class VisitCounter {
    private $file;

    function __construct($f) {
        session_start();
        $this->file = $f;
    }

    function count() {
        if (!isset($_SESSION['counted'])) {
            $count = file_get_contents($this->file);
            $count++;
            file_put_contents($this->file, $count);
            $_SESSION['counted'] = true;
        } else {
            $count = file_get_contents($this->file);
        }

        return $count;
    }
}
