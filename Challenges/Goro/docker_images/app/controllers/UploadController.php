<?php
require_once '/var/www/html/models/Post.php';

class UploadController {
    private $postModel;

    public function __construct() {
        $this->postModel = new Post();
    }

    public function handleUpload($file) {
        $fileTemp = $file["tmp_name"];        
        $fileType = $file["type"];
        if ($fileType === "text/xml" || $fileType === "application/xml") {
            $xml = file_get_contents($fileTemp);
            $dom = new \DOMDocument();
            $dom->loadXML($xml, LIBXML_NOENT | LIBXML_DTDLOAD);
            $data = simplexml_import_dom($dom);
            
            $this->postModel->insertPost($data->title, $data->content);
        }
    }

    public function render() {
        require_once '/var/www/html/views/upload.php';
    }
}
?>