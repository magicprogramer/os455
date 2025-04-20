<?php
require_once "vendor/autoload.php";
if (!isset($_GET['id']))
{
    header("Location: index.php");
    exit();
}
$db = new MySQLHandler();
$db->connect();
$data = $db->get_record_by_id($_GET['id'], "id");
//print_r($data);
$db->disconnect();
?>
<html>
    <head>
    <link href="https://cdn.jsdelivr.net/npm/daisyui@5" rel="stylesheet" type="text/css" />
    <script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script>
</head>
<body>
<div tabindex="0" class="collapse bg-base-100 border-base-300 border">
  <div class="collapse-title font-semibold"><?php echo $data->product_name;?></div>
  <div class="collapse-content text-sm">
  <div class="hero bg-base-200 min-h-screen">
  <div class="hero-content flex-col lg:flex-row">
    <img
      src=<?php echo "images/".$data->Photo;?>
      class="max-w-sm rounded-lg shadow-2xl"
    />
    <div>
      <h1 class="text-5xl font-bold"><?php echo $data->product_name?></h1>
      <p class="py-6">
       <?php
       echo"$data->product_name <br> $data->list_price";
       ?>
      </p>
    </div>
  </div>
</div>    

</div>
</div>
</body>
    </html>
