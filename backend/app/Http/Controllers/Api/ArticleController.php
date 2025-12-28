<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Article;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class ArticleController extends Controller
{
    public function index()
    {
        return Article::latest()->get();
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'title' => 'required|string',
            'content' => 'required',
            'type' => 'required|in:original,updated',
            'source_url' => 'nullable|url',
            'reference_links' => 'nullable|array',
        ]);

        $data['slug'] = Str::slug($data['title']) . '-' . uniqid();

        return Article::create($data);
    }

    public function show(Article $article)
    {
        return $article;
    }

    public function update(Request $request, Article $article)
    {
        $article->update($request->all());
        return $article;
    }

    public function destroy(Article $article)
    {
        $article->delete();
        return response()->noContent();
    }
}
