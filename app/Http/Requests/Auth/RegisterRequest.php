<?php

namespace App\Http\Requests\Auth;

use App\Traits\Helper;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Validation\Rule;

class RegisterRequest extends FormRequest
{
    use Helper;
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array|string>
     */
    public function rules(): array
    {
        return [
            "name" => "required",
            'email' => 'required|email:rfc,dns|unique:users',
            'password' => 'required|min:6|confirmed',
            "role_id" => "sometimes",
            "status" => "sometimes|" . Rule::in(['active', 'inactive'])
        ];
    }

    protected function failedValidation(Validator $validator)
    {
        if ($this->wantsJson() || $this->ajax()) {
            throw new HttpResponseException($this->validateError($validator->errors()));
        }
        parent::failedValidation($validator);
    }
}
