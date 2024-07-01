<?php

declare(strict_types=1);

namespace App\Service;

use App\Entity\Order;
use App\Repository\OrderRepository;

class OrderService
{
    private OrderRepository $orderRepository;

    public function __construct(OrderRepository $orderRepository)
    {
        $this->orderRepository = $orderRepository;
    }

    public function addOrder(int $userId, string $address, string $phone, \DateTime $date, string $content): Order
    {
        $order = new Order();
        $order->setUserId($userId);
        $order->setAddress($address);
        $order->setPhone($phone);
        $order->setDate($date);
        $order->setOrderContent($content);

        $this->orderRepository->store($order);

        return $order;
    }

    public function getOrder(int $orderId): ?Order
    {
        return $this->orderRepository->findByColumn('order_id', (string)$orderId);
    }

    public function deleteOrder(int $orderId): void
    {
        $order = $this->orderRepository->findByColumn('order_id', (string)$orderId);
        if ($order !== null) {
            $this->orderRepository->delete($order);
        }
    }

    public function listAllOrders(): array
    {
        return $this->orderRepository->listAll();
    }
}
