<?php

declare(strict_types=1);

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass="App\Repository\PizzaRepository")
 */
class Pizza
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="AUTO")
     * @ORM\Column(type="integer")
     */
    private ?int $pizza_id = null;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private string $pizza_name;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private string $ingredient;

    /**
     * @ORM\Column(type="integer")
     */
    private int $cost;

    // Getters and Setters

    public function getPizzaId(): ?int
    {
        return $this->pizza_id;
    }

    public function getPizzaName(): string
    {
        return $this->pizza_name;
    }

    public function setPizzaName(string $pizza_name): void
    {
        $this->pizza_name = $pizza_name;
    }

    public function getIngredient(): string
    {
        return $this->ingredient;
    }

    public function setIngredient(string $ingredient): void
    {
        $this->ingredient = $ingredient;
    }

    public function getCost(): int
    {
        return $this->cost;
    }

    public function setCost(int $cost): void
    {
        $this->cost = $cost;
    }
}
