<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Alternative extends Model
{
    use HasFactory;
    use SoftDeletes;

    protected $table = 'alternatives';
    protected $fillable = ['name']; 

    public function criterias()
    {
        return $this->belongsToMany(Criteria::class, 'criterias_alternatives', 'alternative_id', 'criteria_id')
            ->withPivot('value') // if you want to access the 'value' field in the pivot table
            ->withTimestamps(); // if you want to include timestamps
    }
}
