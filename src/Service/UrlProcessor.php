<?php
namespace App\Service;

class UrlProcessor
{
    public function toFullUrl($url): string {
        return $this->parseUrl($url, 'full');
    }

    public function toUrlTitle($url): string {
        return $this->parseUrl($url, 'title');
    }

    private function parseUrl($url, $mode): string {
        $parts = parse_url($url);

        $url = '';

        if (!empty($parts['scheme']) && $mode == 'full') {
            $url .= $parts['scheme'] . ':';
        }

        if (!empty($parts['host']) && $mode == 'full') {
            $url .= '//';
        }

        if (!empty($parts['host'])) {
            $url .= $parts['host'];
        }

        if (!empty($parts['path'])) {
            $url .= $parts['path'];
        }

        if (!empty($parts['query'])) {
            if (is_array($parts['query'])) {
                $url .= '?' . http_build_query($parts['query']);
            } else {
                $url .= '?' . $parts['query'];
            }
        }

        return $url;
    }
}