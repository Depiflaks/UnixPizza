<?php

declare(strict_types=1);

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass="App\Repository\OrderRepository")
 * @ORM\Table(name="orders")
 */
class Order
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="AUTO")
     * @ORM\Column(type="integer")
     */
    private ?int $order_id = null;

    /**
     * @ORM\Column(type="integer")
     */
    private int $user_id;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private string $address;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private string $phone;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private string $order_content;

    /**
     * @ORM\Column(type="datetime")
     */
    private \DateTimeInterface $date;

    // Getters and Setters

    public function getOrderId(): ?int
    {
        return $this->order_id;
    }

    public function getUserId(): int
    {
        return $this->user_id;
    }

    public function setUserId(int $user_id): void
    {
        $this->user_id = $user_id;
    }

    public function getAddress(): string
    {
        return $this->address;
    }

    public function setAddress(string $address): void
    {
        $this->address = $address;
    }

    public function getPhone(): string
    {
        return $this->phone;
    }

    public function setPhone(string $phone): void
    {
        $this->phone = $phone;
    }

    public function getDate(): \DateTimeInterface
    {
        return $this->date;
    }

    public function setDate(\DateTimeInterface $date): void
    {
        $this->date = $date;
    }

    public function getOrderContent(): string
    {
        return $this->order_content;
    }

    public function setOrderContent(string $content): void
    {
        $this->order_content = $content;
    }

    public function toArray(): array
    {
        return [
            'order_id' => $this->getOrderId(),
            'user_id' => $this->getUserId(),
            'address' => $this->getAddress(),
            'phone' => $this->getPhone(),
            'date' => $this->getDate()->format('Y-m-d H:i:s'),
            'order_content' => $this->getOrderContent(),
        ];
    }
}
