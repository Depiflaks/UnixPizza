<?php
declare(strict_types=1);

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

class CommandController extends AbstractController
{
    public function index(): Response 
    {
        $contents = $this->render('panel/panel.html.twig');
        return $contents;
    }

    public function addTip(): Response 
    {
        $contents = $this->render('contents/tip.html.twig');
        return $contents;
    }

    public function addLine(): Response 
    {
        $contents = $this->render('contents/command_line.html.twig', ["data" => ["user_name" => "user"]]);
        return $contents;
    }

    public function addHelp(): Response 
    {
        $contents = $this->render('contents/help.html.twig', ["isAdmin" => true]);
        return $contents;
    }

    public function addText(): Response 
    {
        $body = json_decode(file_get_contents("php://input"), true);
        $text = $body["text"];
        $contents = $this->render('contents/out_text.html.twig', ["text" => $text]);
        return $contents;
    }

    public function pizzaList(): Response 
    {
        $pizza = [
            [
                "id" => "0",
                "name" => "Margherita",
                "ingridients" => "Tomato, Mozzarella, Basil",
                "cost" => 8,
            ],
            [
                "id" => "1",
                "name" => "Pepperoni",
                "ingridients" => "Pepperoni, Mozzarella, Tomato Sauce",
                "cost" => 9,
            ],
            [
                "id" => "2",
                "name" => "BBQ Chicken",
                "ingridients" => "Chicken, BBQ Sauce, Red Onions, Cilantro",
                "cost" => 11,
            ],
        ];
        $contents = $this->render('pizza/pizza_list.html.twig', ["data" => $pizza]);
        return $contents;
    }
}