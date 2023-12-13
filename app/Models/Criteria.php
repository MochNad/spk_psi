<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Criteria extends Model
{
    use HasFactory;
    use SoftDeletes;

    protected $table = 'criterias';
    protected $fillable = [
        'name',
        'weight',
        'type',
    ]; 

    public function alternatives()
    {
        return $this->belongsToMany(Alternative::class, 'criterias_alternatives', 'criteria_id', 'alternative_id')
            ->withPivot('value') // if you want to access the 'value' field in the pivot table
            ->withTimestamps(); // if you want to include timestamps
    }
}
