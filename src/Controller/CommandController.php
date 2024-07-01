<?php
declare(strict_types=1);

namespace App\Controller;

use App\Service\PizzaService;
use App\Service\SecurityService;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

class CommandController extends AbstractController
{
    private PizzaService $pizzaService;
    private SecurityService $securityService;

    public function __construct(PizzaService $pizzaService, SecurityService $securityService)
    {
        $this->pizzaService = $pizzaService;
        $this->securityService = $securityService;
    }

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
        $contents = $this->render('contents/help.html.twig', ["isAdmin" => $this->securityService->isAdmin()]);
        return $contents;
    }

    public function addText(): Response 
    {
        $body = json_decode(file_get_contents("php://input"), true);
        $text = $body["text"];
        $contents = $this->render('contents/out_text.html.twig', ["text" => $text]);
        return $contents;
    }

    public function addPizzaComplete(): Response 
    {
        $body = json_decode(file_get_contents("php://input"), true);
        $contents = $this->render('contents/pizza_add.html.twig', ["name" => $body["name"], "count" => $body["count"]]);
        return $contents;
    }

    public function addInputLine(): Response 
    {
        $body = json_decode(file_get_contents("php://input"), true);
        $contents = $this->render('contents/input_line.html.twig', ["text" => $body["text"], "password" => $body["pass"]]);
        return $contents;
    }

    public function addError(): Response
    {
        $body = json_decode(file_get_contents("php://input"), true);
        $text = $body["text"];
        $contents = $this->render('error/error.html.twig', ["text" => $text]);
        return $contents;
    }

    public function userCart() : Response {
        $body = json_decode(file_get_contents("php://input"), true);
        $contents = $this->render('pizza/pizza_cart.html.twig', ["data" => $body["data"]]);
        return $contents;
    }

    public function pizzaList(): Response 
    {
        $pizzas = $this->pizzaService->listAllPizzas();
        $contents = $this->render('pizza/pizza_list.html.twig', ["data" => $pizzas]);
        return $contents;
    }
}