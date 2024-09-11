> php artisan install:api

./composer.json has been updated
.
.
.
> Illuminate\Foundation\ComposerScripts::postAutoloadDump
> @php artisan package:discover --ansi

INFO Discovering packages.

laravel/sail .............................................. DONE
laravel/sanctum .............................................. DONE
laravel/tinker .............................................. DONE
nesbot/carbon .............................................. DONE
nunomaduro/collision .............................................. DONE
nunomaduro/termwind .............................................. DONE

79 packages you are using are looking for funding.
> @php artisan vendor:publish --tag=laravel-assets --ansi --force

INFO No publishable resources for tag [laravel-assets].

No security vulnerability advisories found
ERROR API routes file already exists.

One new database migration has been published. Would you like to run all pending database migrations? (yes/no) [yes]:
> no

INFO API scaffolding installed. Please add the [Laravel\Sanctum\HasApiTokens] trait to your User model.

> **php artisan** route:list
GET|HEAD  api/customers ................................................................................................................................................................................... CustomerController@index
POST      api/customers ................................................................................................................................................................................... CustomerController@store  
GET|HEAD  api/customers/search ........................................................................................................................................................................... CustomerController@search  
PUT       api/customers/{id} ............................................................................................................................................................................. CustomerController@update  
DELETE    api/customers/{id} ............................................................................................................................................................................ CustomerController@destroy  
POST      api/login ........................................................................................................................................................................................... AuthController@login  
POST      api/logout ......................................................................................................................................................................................... AuthController@logout  
POST      api/register ..................................................................................................................................................................................... AuthController@register  
POST      api/user ............................................................................................................................................................................................. AuthController@user  
GET|HEAD  sanctum/csrf-cookie .................................................................................................................................... sanctum.csrf-cookie › Laravel\Sanctum › CsrfCookieController@show  


comments:
-------------------

TEST - backend/frontend
