<?php

declare(strict_types=1);

namespace App\Controller;

use App\Service\UserService;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class UserController extends AbstractController
{
    private UserService $userService;

    public function __construct(UserService $userService)
    {
        $this->userService = $userService;
    }

    public function createUser(Request $request): Response
    {
        $data = json_decode(file_get_contents("php://input"), true);
        $user = $this->userService->addUser(
            $data['user_name'],
            $data['user_name'],
            $data['password']
        );

        return $this->json(['status' => 'User created', 'id' => $user->getUserId()], Response::HTTP_CREATED);
    }

    public function listUsers(): Response
    {
        $users = $this->userService->listAllUsers();
        
        return $this->json($users, Response::HTTP_OK);
    }

    public function getUserById(int $id): Response
    {
        $user = $this->userService->getUser($id);

        if (!$user) {
            return $this->json(['status' => 'User not found'], Response::HTTP_NOT_FOUND);
        }

        return $this->json($user, Response::HTTP_OK);
    }

    public function deleteUser(int $id): Response
    {
        $this->userService->deleteUser($id);

        return $this->json(['status' => 'User deleted'], Response::HTTP_NO_CONTENT);
    }
}
