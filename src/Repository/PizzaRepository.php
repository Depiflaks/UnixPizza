<?php
declare(strict_types=1);

namespace App\Repository;

use App\Entity\Pizza;
use Doctrine\ORM\EntityManagerInterface;
use Doctrine\ORM\EntityRepository;

class PizzaRepository
{
    private EntityManagerInterface $entityManager;
    private EntityRepository $repository;

    public function __construct(EntityManagerInterface $entityManager)
    {
        $this->entityManager = $entityManager;
        $this->repository = $entityManager->getRepository(Pizza::class);
    }

    public function findByColumn(string $column, string $value): ?Pizza
    {
        return $this->repository->findOneBy([$column => $value]);
    }

    public function store(Pizza $user): int
    {
        $this->entityManager->persist($user);
        $this->entityManager->flush();
        return $user->getId();
    }

    public function delete(Pizza $user): void
    {
        $this->entityManager->remove($user);
        $this->entityManager->flush();
    }

    public function listAll(): array
    {
        return $this->repository->findAll();
    }
}