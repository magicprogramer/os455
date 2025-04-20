<?php
use Illuminate\Database\Capsule\Manager as caps;

class MySQLHandler implements DbHandler {
    private $caps;

    function connect()
    {
        try {
            $this->caps = new caps();
            $this->caps->addConnection([
                'driver' => "mysql",
                "host" => __HOST__,
                "database" => __DB__,
                "username" => __USER__,
                "password" => __PASS__,
                "port" => 3307
            ]);
            $this->caps->setAsGlobal();
            $this->caps->bootEloquent();
            return true;
        } catch (Exception $e) {
            return false;
        }
    }

    function get()
    {
        $res = $this->caps->table('items')->get();
        return $res;
    }

    function get_data($fields = array(), $start = 0)
    {
        $res = $this->caps->table('items');

        if (!empty($fields)) {
            $res = $res->select($fields);
        }
        if ($start && $start < $res->count())
        {
            $res = $res->skip($start)->take(PHP_INT_MAX);
        }
        return $res->get();
    }


    function disconnect()
    {
        $this->caps->getConnection()->disconnect();
    }

    function get_record_by_id($id, $primary_key)
    {
        return $this->caps->table('items')->where($primary_key, $id)->first();
    }
}
