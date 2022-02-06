<?php
namespace App\Controller;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class IndexController extends AbstractController
{
    #[Route(
        '/{reactRouting}',
        name: 'index',
        requirements: [
            'reactRouting' => '^(?!api).+'
        ],
        defaults: [
            'reactRouting' => null
        ]
    )]
    public function number(): Response
    {
        return $this->render('index.html.twig', [

        ]);
    }
}
