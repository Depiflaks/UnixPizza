<?php

declare(strict_types=1);

namespace App\Service;

use App\Entity\Pizza;
use App\Repository\PizzaRepository;

class PizzaService
{
    private PizzaRepository $pizzaRepository;

    public function __construct(PizzaRepository $pizzaRepository)
    {
        $this->pizzaRepository = $pizzaRepository;
    }

    public function addPizza(string $pizzaName, string $ingridients, int $cost): Pizza
    {
        $pizza = new Pizza();
        $pizza->setPizzaName($pizzaName);
        $pizza->setIngridients($ingridients);
        $pizza->setCost($cost);

        $this->pizzaRepository->store($pizza);

        return $pizza;
    }

    public function getPizza(int $pizzaId): ?Pizza
    {
        return $this->pizzaRepository->findByColumn('pizza_id', (string)$pizzaId);
    }

    public function deletePizza(int $pizzaId): void
    {
        $pizza = $this->pizzaRepository->findByColumn('pizza_id', (string)$pizzaId);
        if ($pizza !== null) {
            $this->pizzaRepository->delete($pizza);
        }
    }

    public function listAllPizzas(): array
    {
        $pizzas = $this->pizzaRepository->listAll();
        $func = function(Pizza $pizza): array {
            return $pizza->toArray();
        };
        $data = array_map($func, $pizzas);
        return $data;
    }
}
