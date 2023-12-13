<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Criteria_Alternative extends Model
{
    use HasFactory;
    use SoftDeletes;

    protected $table = 'criterias_alternatives';
    protected $fillable = [
        'criteria_id',
        'alternative_id',
        'value',
    ];

    public function criteria()
    {
        return $this->belongsTo(Criteria::class, 'criteria_id');
    }

    public function alternative()
    {
        return $this->belongsTo(Alternative::class, 'alternative_id');
    }
}
