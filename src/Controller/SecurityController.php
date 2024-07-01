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

    public function login(Request $request): Response
    {
        $username = $request->request->get('username');
        $password = $request->request->get('password');

        return $this->json(["login" => $this->securityService->checkCredentials($username, $password)], Response::HTTP_OK);
    }

    public function logout(): Response
    {
        $this->securityService->logout();
        return $this->redirectToRoute('homepage');
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
