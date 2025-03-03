<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity
 * @ORM\Table(name="users")
 */
class User
{
    /**
     * @ORM\Id
     * @ORM\Column(type="integer")
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    private ?int $user_id = null;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private string $user_name;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private string $email;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private string $password;

    /**
     * @ORM\Column(type="boolean")
     */
    private bool $is_admin = false;

    // Getters and setters

    public function getUserId(): ?int
    {
        return $this->user_id;
    }

    public function getUserName(): string
    {
        return $this->user_name;
    }

    public function setUserName(string $user_name): void
    {
        $this->user_name = $user_name;
    }

    public function isAdmin(): bool
    {
        return $this->is_admin;
    }

    public function setAdmin(bool $is_admin): void
    {
        $this->is_admin = $is_admin;
    }

    public function getEmail(): string
    {
        return $this->email;
    }

    public function setEmail(string $email): void
    {
        $this->email = $email;
    }

    public function getPassword(): string
    {
        return $this->password;
    }

    public function setPassword(string $password): void
    {
        $this->password = $password;
    }

    public function toArray(): array
    {
        return [
            'user_id' => $this->getUserId(),
            'user_name' => $this->getUserName(),
            'email' => $this->getEmail(),
            'password' => $this->getPassword()
        ];
    }
}