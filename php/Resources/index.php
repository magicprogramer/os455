<?php
require_once "vendor/autoload.php";
$db = new MySQLHandler();
$db->connect();
$data = $db->get_data([], 0); 
$GLOBALS['db']= $db;
?>
<table border="1">
    <tr>
        <th>Image</th>
        <th>Name</th>
        <th>Details</th>
    </tr>

    <?php foreach ($data as $item): ?>
    <tr>
        <td><img src="<?= htmlspecialchars("images/$item->Photo") ?>" width="100"></td>
        <td><?= htmlspecialchars($item->product_name) ?></td>
        <td><a href="details.php?id=<?= htmlspecialchars($item->id) ?>">Details</a></td>
    </tr>
    <?php endforeach; ?>
</table>