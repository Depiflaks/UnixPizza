<?php

declare(strict_types=1);

namespace App\Controller;

use App\Entity\Order;
use App\Repository\OrderRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class OrderController extends AbstractController
{
    private OrderRepository $orderRepository;

    public function __construct(OrderRepository $orderRepository)
    {
        $this->orderRepository = $orderRepository;
    }

    /**
     * @Route("/order", methods={"POST"})
     */
    public function createOrder(Request $request): JsonResponse
    {
        $data = json_decode($request->getContent(), true);

        $order = new Order();
        $order->setUserId((int)$data['user_id']);
        $order->setAddress($data['address']);
        $order->setPhone($data['phone']);
        $order->setDate(new \DateTime($data['date']));

        $id = $this->orderRepository->store($order);

        return new JsonResponse(['status' => 'Order created', 'id' => $id], Response::HTTP_CREATED);
    }

    /**
     * @Route("/orders", methods={"GET"})
     */
    public function listOrders(): JsonResponse
    {
        $orders = $this->orderRepository->listAll();

        return new JsonResponse($orders, Response::HTTP_OK);
    }

    /**
     * @Route("/order/{id}", methods={"DELETE"})
     */
    public function deleteOrder(int $id): JsonResponse
    {
        $order = $this->orderRepository->findByColumn('order_id', (string)$id);

        if (!$order) {
            return new JsonResponse(['status' => 'Order not found'], Response::HTTP_NOT_FOUND);
        }

        $this->orderRepository->delete($order);

        return new JsonResponse(['status' => 'Order deleted'], Response::HTTP_NO_CONTENT);
    }
}
