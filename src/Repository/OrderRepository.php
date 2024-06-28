<?php

declare(strict_types=1);

namespace App\Repository;

use App\Entity\Order;
use Doctrine\ORM\EntityManagerInterface;
use Doctrine\ORM\EntityRepository;

class OrderRepository
{
    private EntityManagerInterface $entityManager;
    private EntityRepository $repository;

    public function __construct(EntityManagerInterface $entityManager)
    {
        $this->entityManager = $entityManager;
        $this->repository = $entityManager->getRepository(Order::class);
    }

    public function findByColumn(string $column, string $value): ?Order
    {
        return $this->repository->findOneBy([$column => $value]);
    }

    public function store(Order $order): int
    {
        $this->entityManager->persist($order);
        $this->entityManager->flush();
        return $order->getOrderId();
    }

    public function delete(Order $order): void
    {
        $this->entityManager->remove($order);
        $this->entityManager->flush();
    }

    public function listAll(): array
    {
        return $this->repository->findAll();
    }
}
