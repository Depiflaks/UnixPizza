<?php

declare(strict_types=1);

namespace App\Controller;

use App\Entity\Pizza;
use App\Service\PizzaService;
use App\Service\SecurityService;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class PizzaController extends AbstractController
{
    private PizzaService $pizzaService;
    private SecurityService $securityService;

    public function __construct(PizzaService $pizzaService, SecurityService $securityService)
    {
        $this->pizzaService = $pizzaService;
        $this->securityService = $securityService;
    }

    public function createPizza(Request $request): JsonResponse
    {
        if (!$this->securityService->isAdmin()) return $this->json(['status' => 'not enough rights'], Response::HTTP_NO_CONTENT);

        $body = json_decode(file_get_contents("php://input"), true);

        $pizza = $this->pizzaService->addPizza(
            $body['pizza_name'],
            $body['ingridients'],
            (int)$body['cost']
        );

        return $this->json(['status' => 'Pizza created', 'id' => $pizza->getPizzaId()], Response::HTTP_CREATED);
    }

    public function listPizzas(): Response
    {
        $pizzas = $this->pizzaService->listAllPizzas();
        return $this->json($pizzas, Response::HTTP_OK);
    }

    public function getPizza(int $id): Response
    {
        $pizza = $this->pizzaService->getPizza($id);

        if (!$pizza) {
            return $this->json(['status' => 'Pizza not found'], Response::HTTP_NOT_FOUND);
        }

        return $this->json($pizza, Response::HTTP_OK);
    }

    public function deletePizza(int $id): Response
    {
        if (!$this->securityService->isAdmin()) return $this->json(['status' => 'not enough rights'], Response::HTTP_OK);
        $this->pizzaService->deletePizza($id);

        return $this->json(['status' => 'Pizza deleted'], Response::HTTP_OK);
    }
}
