<html>
    <head>
        <title> contact form </title>


    </head>

    <body>
        <h3> Contact Form </h3>
        <div id="after_submit">
            <?php
                require 'vendor/autoload.php';
                if (isset($_POST['submit']))
                {
                    $name = $_POST['name'];
                    $email = $_POST['email'];
                    $message = $_POST['message'];
                    $good = true;
                    if (isset($_POST['name']) && strlen($_POST['name']) && strlen($_POST['name']) < conf()['max_length']['name'])
                    {
                        $name = $_POST['name'];
                    }
                    else
                    {
                        echo "name is invalid".nl2br("\n");
                        $good = false;
                    }
                    if (isset($_POST['email']) && $_POST['email'] && filter_var($email, FILTER_VALIDATE_EMAIL))
                    {
                        $email = $_POST['email'];
                    }
                    else
                    {
                        echo "email is invalid".nl2br("\n");
                        $good = false;
                    }
                    if (isset($_POST['message']) && strlen($_POST['message']) && strlen($_POST['message']) < conf()['max_length']['msg'])
                    {
                        $message = $_POST['message'];
                    }
                    else
                    {
                        echo "message is invalid".nl2br("\n");
                        $good = false;
                    }
                    if ($good)
                    {
                        echo conf()['msg'].nl2br("\n");
                        echo "<strong>name:</strong>$name".nl2br("\n");
                        echo "<strong>email:</strong>$email".nl2br("\n");
                        echo "<strong>message:</strong>$message".nl2br("\n");

                    }
                    
                }
            ?>
        </div>
        <form id="contact_form" action="#" method="POST" enctype="multipart/form-data">

            <div class="row">
                <label class="required" for="name">Your name:</label><br />
                <input id="name" class="input" name="name" type="text" value="<?php
                 if (isset($_POST['submit']))
                 {
                    echo $name;
                 }
                ?>" size="30" /><br />

            </div>
            <div class="row">
                <label class="required" for="email">Your email:</label><br />
                <input id="email" class="input" name="email" type="text" value="<?php 
                
                 if (isset($_POST['submit']))echo $email;
            ?>"size="30" /><br />

            </div>
            <div class="row">
                <label class="required" for="message">Your message:</label><br />
                <textarea id="message" class="input" name="message" rows="7" cols="30"><?php $message ?></textarea><br />

            </div>

            <input id="submit" name="submit" type="submit" value="Send email" />
            <input id="clear" name="clear" type="reset" value="clear form" />

        </form>
    </body>

</html>