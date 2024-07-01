<?php

declare(strict_types=1);

namespace App\Service;

use App\Entity\User;
use App\Repository\UserRepository;

class UserService
{
    private UserRepository $userRepository;

    public function __construct(UserRepository $userRepository)
    {
        $this->userRepository = $userRepository;
    }

    public function addUser(string $userName, string $email, string $password): User
    {
        $user = new User();
        $user->setUserName($userName);
        $user->setEmail($email);
        $user->setPassword(md5($password));

        $this->userRepository->store($user);

        return $user;
    }

    public function getUser(string $userName): ?User
    {
        $user = $this->userRepository->findByColumn('user_name', $userName);
        if ($user) {
            return $user;
        }
        return null;
    }

    public function deleteUser(int $userId): void
    {
        $user = $this->userRepository->findByColumn('user_id', (string)$userId);
        if ($user !== null) {
            $this->userRepository->delete($user);
        }
    }

    public function listAllUsers(): array
    {
        $users = $this->userRepository->listAll();
        $func = function(User $user): array {
            return $user->toArray();
        };
        $data = array_map($func, $users);
        return $data;
    }
}
