<?php

declare(strict_types=1);

namespace App\Controller;

use App\Service\OrderService;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class OrderController extends AbstractController
{
    private OrderService $orderService;

    public function __construct(OrderService $orderService)
    {
        $this->orderService = $orderService;
    }

    /**
     * @Route("/order", methods={"POST"})
     */
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

    /**
     * @Route("/orders", methods={"GET"})
     */
    public function listOrders(): JsonResponse
    {
        $orders = $this->orderService->listAllOrders();

        return new JsonResponse($orders, Response::HTTP_OK);
    }

    /**
     * @Route("/order/{id}", methods={"GET"})
     */
    public function getOrder(int $id): JsonResponse
    {
        $order = $this->orderService->getOrder($id);

        if (!$order) {
            return new JsonResponse(['status' => 'Order not found'], Response::HTTP_NOT_FOUND);
        }

        return new JsonResponse($order, Response::HTTP_OK);
    }

    /**
     * @Route("/order/{id}", methods={"DELETE"})
     */
    public function deleteOrder(int $id): JsonResponse
    {
        $this->orderService->deleteOrder($id);

        return new JsonResponse(['status' => 'Order deleted'], Response::HTTP_NO_CONTENT);
    }
}
