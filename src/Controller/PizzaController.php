<?php

declare(strict_types=1);

namespace App\Controller;

use App\Entity\Pizza;
use App\Service\PizzaService;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class PizzaController extends AbstractController
{
    private PizzaService $pizzaService;

    public function __construct(PizzaService $pizzaService)
    {
        $this->pizzaService = $pizzaService;
    }

    /**
     * @Route("/pizza", methods={"POST"})
     */
    public function createPizza(Request $request): JsonResponse
    {
        $data = json_decode($request->getContent(), true);

        $pizza = $this->pizzaService->addPizza(
            $data['pizza_name'],
            $data['ingredient'],
            (int)$data['cost']
        );

        return new JsonResponse(['status' => 'Pizza created', 'id' => $pizza->getPizzaId()], Response::HTTP_CREATED);
    }

    public function listPizzas(): Response
    {
        $pizzas = $this->pizzaService->listAllPizzas();
        return $this->json($pizzas, Response::HTTP_OK);
    }

    public function getPizza(int $id): JsonResponse
    {
        $pizza = $this->pizzaService->getPizza($id);

        if (!$pizza) {
            return new JsonResponse(['status' => 'Pizza not found'], Response::HTTP_NOT_FOUND);
        }

        return new JsonResponse($pizza, Response::HTTP_OK);
    }

    public function deletePizza(int $id): JsonResponse
    {
        $this->pizzaService->deletePizza($id);

        return new JsonResponse(['status' => 'Pizza deleted'], Response::HTTP_NO_CONTENT);
    }
}
