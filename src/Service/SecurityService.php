<?php
declare(strict_types=1);

namespace App\Service;

use App\Entity\User;
use App\Repository\UserRepository;
use Symfony\Component\HttpFoundation\Session\SessionInterface;

class SecurityService
{
    private UserRepository $userRepository;
    private SessionInterface $session;

    public function __construct(UserRepository $userRepository, SessionInterface $session)
    {
        $this->userRepository = $userRepository;
        $this->session = $session;
    }

    public function checkCredentials(string $username, string $password): bool
    {

        $user = $this->userRepository->findByColumn('user_name', $username);
        
        if ($user && $user->getPassword() === md5($password)) {
            $this->session->set('user_id', $user->getUserId());
            return true;
        }

        return false;
    }

    public function isAdmin(): bool
    {
        $userId = $this->session->get('user_id');

        if ($userId) {
            $user = $this->userRepository->findByColumn("user_id", (string)$userId);
            return $user && $user->isAdmin();
        }

        return false;
    }

    public function isUserLoggedIn(): bool
    {
        return $this->session->has('user_id');
    }

    public function getId(): ?int
    {
        return $this->session->get('user_id');
    }

    public function getUser(): ?User
    {
        $userId = $this->session->get('user_id');

        if ($userId) {
            return $this->userRepository->findByColumn("user_id", (string)$userId);
        }

        return null;
    }

    public function logout(): void
    {
        $this->session->remove('user_id');
    }
}
