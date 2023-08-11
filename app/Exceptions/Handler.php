<?php

namespace App\Exceptions;

use App\Traits\Helper;
use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;
use Throwable;
use Illuminate\Auth\AuthenticationException;
use Illuminate\Http\Exceptions\ThrottleRequestsException;


class Handler extends ExceptionHandler
{
    use Helper;
    /**
     * The list of the inputs that are never flashed to the session on validation exceptions.
     *
     * @var array<int, string>
     */
    protected $dontFlash = [
        'current_password',
        'password',
        'password_confirmation',
    ];

    /**
     * Register the exception handling callbacks for the application.
     */
    public function register(): void
    {
        $this->reportable(function (Throwable $e) {
            //
        });
    }

    protected function unauthenticated($request, AuthenticationException $exception)
    {
        return $request->expectsJson()
            ? $this->messageResponse('Unauthenticated', 401)
            : true;
    }

    public function render($request, Throwable $e)
    {
        if ($e instanceof ThrottleRequestsException && $request->wantsJson()) {
            return $this->messageResponse('Too many attempts, please slow down the request.', 500, 'server_error');
        }

        return parent::render($request, $e);
    }
}
