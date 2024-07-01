<?php
declare(strict_types=1);

namespace App\Controller;

use App\Service\SecurityService;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class SecurityController extends AbstractController
{
    private SecurityService $securityService;

    public function __construct(SecurityService $securityService)
    {
        $this->securityService = $securityService;
    }

    public function getId(): Response
    {
        return $this->json(["id" => $this->securityService->getId()], Response::HTTP_OK);
    }

    public function login(): Response
    {
        $data = json_decode(file_get_contents("php://input"), true);

        $username = $data["user_name"];
        $password = $data["password"];

        return $this->json(["login" => $this->securityService->checkCredentials($username, $password)], Response::HTTP_OK);
    }

    public function logout(): Response
    {
        $this->securityService->logout();
        return $this->json(["logout" => true], Response::HTTP_OK);
    }

    public function isLogin(): Response
    {
        return $this->json(["login" => $this->securityService->isUserLoggedIn()], Response::HTTP_OK);
    }

    public function isAdmin(): Response
    {
        return $this->json(["admin" => $this->securityService->isAdmin()], Response::HTTP_OK);
    }
}
