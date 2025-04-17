<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>visit counter</title>
</head>
<body>
    <h1>total number of visited is:  <?php require_once 'vendor/autoload.php';
        //require_once "classes/VisitCounter.php";
    
    $counter = new VisitCounter(conf()['fpath']);
    echo $counter->count();
    ?> <h1>
    
</body>
</html>