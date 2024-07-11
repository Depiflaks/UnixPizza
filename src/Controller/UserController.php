<?php

declare(strict_types=1);

namespace App\Controller;

use App\Service\SecurityService;
use App\Service\UserService;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;

class UserController extends AbstractController
{
    private UserService $userService;
    private SecurityService $securityService;

    public function __construct(UserService $userService, SecurityService $securityService)
    {
        $this->userService = $userService;
        $this->securityService = $securityService;
    }

    public function createUser(): Response
    {
        $data = json_decode(file_get_contents("php://input"), true);
        $user = $this->userService->addUser(
            $data['user_name'],
            $data['email'],
            $data['password']
        );
        return $this->json(['status' => 'User created', 'id' => $user->getUserId()], Response::HTTP_CREATED);
    }

    public function listUsers(): Response
    {
        if (!$this->securityService->isAdmin()) return $this->json(['status' => 'not enough rights'], Response::HTTP_OK);
        $users = $this->userService->listAllUsers();
        
        return $this->json($users, Response::HTTP_OK);
    }

    public function checkUserName(): Response
    {
        $data = json_decode(file_get_contents("php://input"), true);

        $name = $data["user_name"];
        $user = $this->userService->getUser($name);
        
        return $this->json(["user" => $user ? true : false], Response::HTTP_OK);
    }

    public function deleteUser(int $id): Response
    {
        if (!$this->securityService->isAdmin()) return $this->json(['status' => 'not enough rights'], Response::HTTP_OK);
        $this->userService->deleteUser($id);

        return $this->json(['status' => 'User deleted'], Response::HTTP_OK);
    }
}