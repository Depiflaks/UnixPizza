<?php

declare(strict_types=1);

namespace App\Controller;

use App\Service\OrderService;
use App\Service\SecurityService;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class OrderController extends AbstractController
{
    private OrderService $orderService;
    private SecurityService $securityService;

    public function __construct(OrderService $orderService, SecurityService $securityService)
    {
        $this->orderService = $orderService;
        $this->securityService = $securityService;
    }

    public function createOrder(): JsonResponse
    {
        $data = json_decode(file_get_contents("php://input"), true);

        $order = $this->orderService->addOrder(
            (int)$data['user_id'],
            $data['address'],
            $data['phone'],
            new \DateTime(),
            $data["content"]
        );

        return new JsonResponse(['status' => 'Order created', 'id' => $order->getOrderId()], Response::HTTP_CREATED);
    }

    public function deleteOrder(int $id): Response
    {
        if (!$this->securityService->isAdmin()) return $this->json(['status' => 'not enough rights'], Response::HTTP_OK);
        $this->orderService->deleteOrder($id);

        return $this->json(['status' => 'Order deleted'], Response::HTTP_OK);
    }
}
