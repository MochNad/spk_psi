<?php

namespace App\Http\Controllers;

use App\Models\Alternative;
use App\Models\Criteria;
use App\Models\Criteria_Alternative;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class DashboardController extends Controller
{
    public function index()
    {
        return view('dashboard');
    }

    public function getUsers()
    {
        try {
            $users = User::select('id', 'username')->get();

            foreach ($users as $user) {
                $data = [
                    'id' => $user->id,
                    'username' => $user->username,
                ];

                $validator = Validator::make($data, [
                    'id' => 'required',
                    'username' => 'required',
                ]);

                if ($validator->fails()) {
                    return response()->json(['error' => $validator->errors()], 400);
                }
            }

            return response()->json($users);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Terjadi kesalahan saat mengambil data pengguna'], 500);
        }
    }

    public function addUser(Request $request)
    {
        try {
            $validator = Validator::make($request->all(), [
                'username' => 'required',
                'password' => 'required',
            ]);

            if ($validator->fails()) {
                return response()->json(['error' => $validator->errors()], 400);
            }

            $user = new User();
            $user->username = $request->input('username');
            $user->password = Hash::make($request->input('password'));
            $user->save();

            return response()->json(['success' => true, 'message' => 'Pengguna berhasil ditambahkan']);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Terjadi kesalahan saat menambahkan pengguna'], 500);
        }
    }

    public function getUser($id)
    {
        try {
            $user = User::findOrFail($id);

            return response()->json($user);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Pengguna tidak ditemukan'], 404);
        }
    }

    public function updateUser(Request $request, $id)
    {
        try {
            $this->validate($request, [
                'username' => 'required',
                'password' => 'required',
            ]);

            $user = User::find($id);

            if (!$user) {
                return response()->json(['error' => 'Pengguna tidak ditemukan'], 404);
            }

            $user->username = $request->input('username');

            if ($request->filled('password')) {
                $user->password = Hash::make($request->input('password'));
            }

            $user->save();

            return response()->json(['message' => 'Pengguna berhasil diperbarui']);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Terjadi kesalahan saat memperbarui pengguna', 'message' => $e->getMessage()], 500);
        }
    }

    public function deleteUser(Request $request, $id)
    {
        $request->validate([
            'userId' => 'required',
        ]);

        try {
            $user = User::findOrFail($id);
            $user->delete();

            return response()->json(['message' => 'Pengguna berhasil dihapus']);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Terjadi kesalahan saat menghapus pengguna'], 500);
        }
    }

    public function getCriterias()
    {
        try {
            // Mengambil data kolom yang diinginkan dari model Criteria
            $criterias = Criteria::select('id', 'name', 'type')->get();

            return response()->json($criterias);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Error fetching criteria data'], 500);
        }
    }

    public function getAlternatives()
    {
        try {
            // Mengambil data kolom yang diinginkan dari model Criteria
            $alternatives = Alternative::select('id', 'name')->get();

            return response()->json($alternatives);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Error fetching alternative data'], 500);
        }
    }

    public function addCriteria(Request $request)
    {
        try {
            $validator = Validator::make($request->all(), [
                'name' => 'required',
                'type' => 'required|in:Benefit,Cost', // Add validation for 'type'
            ]);

            if ($validator->fails()) {
                return response()->json(['error' => $validator->errors()], 400);
            }

            $criteria = new Criteria();
            $criteria->name = $request->input('name');
            $criteria->type = $request->input('type'); // Get 'type' from the request
            $criteria->save();

            return response()->json(['success' => true, 'message' => 'Kriteria berhasil ditambahkan']);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Terjadi kesalahan saat menambahkan kriteria'], 500);
        }
    }

    public function addAlternative(Request $request)
    {
        try {
            $validator = Validator::make($request->all(), [
                'name' => 'required',
            ]);

            if ($validator->fails()) {
                return response()->json(['error' => $validator->errors()], 400);
            }

            $alternative = new Alternative();
            $alternative->name = $request->input('name');
            $alternative->save();

            return response()->json(['success' => true, 'message' => 'Alternatif berhasil ditambahkan']);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Terjadi kesalahan saat menambahkan alternatif'], 500);
        }
    }

    public function getCriteria($id)
    {
        try {
            $criteria = Criteria::findOrFail($id);

            return response()->json($criteria);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Kriteria tidak ditemukan'], 404);
        }
    }

    public function getAlternative($id)
    {
        try {
            $alternative = Alternative::findOrFail($id);

            return response()->json($alternative);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Alternatif tidak ditemukan'], 404);
        }
    }

    public function updateCriteria(Request $request, $id)
    {
        try {
            $this->validate($request, [
                'name' => 'required',
                'type' => 'required|in:Benefit,Cost', // Add validation for the 'type' field
            ]);

            $criteria = Criteria::find($id);

            if (!$criteria) {
                return response()->json(['error' => 'Kriteria tidak ditemukan'], 404);
            }

            $criteria->name = $request->input('name');
            $criteria->type = $request->input('type'); // Update the 'type' field
            $criteria->save();

            return response()->json(['message' => 'Kriteria berhasil diperbarui']);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Terjadi kesalahan saat memperbarui kriteria', 'message' => $e->getMessage()], 500);
        }
    }

    public function updateAlternative(Request $request, $id)
    {
        try {
            $this->validate($request, [
                'name' => 'required',
            ]);

            $alternative = Alternative::find($id);

            if (!$alternative) {
                return response()->json(['error' => 'Alternatif tidak ditemukan'], 404);
            }

            $alternative->name = $request->input('name');
            $alternative->save();

            return response()->json(['message' => 'Alternatif berhasil diperbarui']);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Terjadi kesalahan saat memperbarui alternatif', 'message' => $e->getMessage()], 500);
        }
    }

    public function deleteCriteria(Request $request, $id)
    {
        $request->validate([
            'id' => 'required',
        ]);

        try {
            $criteria = Criteria::findOrFail($id);
            $criteria->delete();

            return response()->json(['message' => 'Criteria berhasil dihapus']);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Terjadi kesalahan saat menghapus criteria'], 500);
        }
    }

    public function deleteAlternative(Request $request, $id)
    {
        $request->validate([
            'id' => 'required',
        ]);

        try {
            $alternative = Alternative::findOrFail($id);
            $alternative->delete();

            return response()->json(['message' => 'Alternative berhasil dihapus']);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Terjadi kesalahan saat menghapus alternative'], 500);
        }
    }

    public function getInputs()
    {
        try {
            // Fetch criteria IDs and names
            $criteriaData = Criteria::pluck('name', 'id')->toArray();
            $criterias = array_keys($criteriaData);

            // Fetch alternative IDs and names
            $alternativeData = Alternative::pluck('name', 'id')->toArray();
            $alternatives = array_keys($alternativeData);

            $valuesArray = [];

            foreach ($criterias as $criteriaId) {
                $row = [];
                foreach ($alternatives as $alternativeId) {
                    $criteriaAlternative = Criteria_Alternative::where([
                        'criteria_id' => $criteriaId,
                        'alternative_id' => $alternativeId,
                    ])->first();

                    if ($criteriaAlternative) {
                        // Preserve decimal places and remove trailing zeros
                        $value = rtrim(rtrim($criteriaAlternative->value, '0'), '.');
                        // If the value is now empty, set it to '0'
                        $value = $value === '' ? '0' : $value;

                        $row[] = [
                            'value' => $value,
                            'id' => $criteriaAlternative->id,
                            'criteria_id' => $criteriaId,
                            'alternative_id' => $alternativeId,
                            'criteria_name' => $criteriaData[$criteriaId],
                            'alternative_name' => $alternativeData[$alternativeId],
                        ];
                    } else {
                        // If Criteria_Alternative record doesn't exist, store criteria_id and alternative_id with null value
                        $row[] = [
                            'value' => null,
                            'id' => null,
                            'criteria_id' => $criteriaId,
                            'alternative_id' => $alternativeId,
                            'criteria_name' => $criteriaData[$criteriaId],
                            'alternative_name' => $alternativeData[$alternativeId],
                        ];
                    }
                }
                $valuesArray[$criteriaId] = $row;
            }

            $data = [
                'criteria_ids' => $criterias,
                'alternative_ids' => $alternatives,
                'values' => $valuesArray,
            ];

            $validator = Validator::make($data, [
                'criteria_ids.*' => 'required',
                'alternative_ids.*' => 'required',
            ]);

            if ($validator->fails()) {
                return response()->json(['error' => $validator->errors()], 400);
            }

            return response()->json($data);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Terjadi kesalahan saat mengambil data'], 500);
        }
    }

    public function saveInputs(Request $request)
    {
        try {
            $requestData = $request->all();

            // Extract inputs and token from the request data
            $inputs = $requestData['inputs'];

            foreach ($inputs as $input) {
                $criteriaId = $input['criteriaId'];
                $alternativeId = $input['alternativeId'];
                $value = $input['value'];

                // Find or create a Criteria_Alternative record
                $criteriaAlternative = Criteria_Alternative::updateOrCreate(
                    ['criteria_id' => $criteriaId, 'alternative_id' => $alternativeId],
                    ['value' => $value]
                );

                // Save the model instance to the database
                $criteriaAlternative->save();

                // Optionally, you can add additional logic based on your requirements
            }

            return response()->json(['message' => 'Input data saved successfully'], 200);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Error saving input data: ' . $e->getMessage()], 500);
        }
    }

    public function getMatriks()
    {
        try {
            $matriks = Criteria_Alternative::join('criterias', 'criterias_alternatives.criteria_id', '=', 'criterias.id')
                ->join('alternatives', 'criterias_alternatives.alternative_id', '=', 'alternatives.id')
                ->select(
                    'criterias_alternatives.id',
                    'criterias_alternatives.criteria_id',
                    'criterias_alternatives.alternative_id',
                    'criterias_alternatives.value',
                    'criterias.name as criteria_name',
                    'criterias.type as criteria_type', // tambahkan baris ini untuk mengambil tipe criteria
                    'alternatives.name as alternative_name'
                )
                ->get();

            return response()->json($matriks);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Error fetching criteria data'], 500);
        }
    }
}
